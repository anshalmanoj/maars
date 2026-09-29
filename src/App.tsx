import React, { useState, useMemo } from 'react';
import { PRODUCTS, BRAND_STATS, STORE_PROMISES } from './data/products';
import { ShoeProduct, CartItem, Brand, Category, Gender } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { WishlistModal } from './components/WishlistModal';
import { AuthenticityGuarantee } from './components/AuthenticityGuarantee';
import { LookbookSection } from './components/LookbookSection';
import { Footer } from './components/Footer';
import { MarsLogo } from './components/MarsLogo';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Search, 
  Ruler, 
  X,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  // Navigation & Filter States
  const [selectedBrand, setSelectedBrand] = useState<Brand | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedGender, setSelectedGender] = useState<'All' | Gender>('All');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Cart & Commerce States
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Start with 1 popular Samba in cart for immediate delightful UX
    {
      product: PRODUCTS[1],
      selectedSize: 9.5,
      quantity: 1,
    },
  ]);
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Wishlist State
  const [wishlist, setWishlist] = useState<ShoeProduct[]>([PRODUCTS[0]]);

  // Modals & Panels
  const [activeProductModal, setActiveProductModal] = useState<ShoeProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Brand filter
      if (selectedBrand !== 'All' && product.brand !== selectedBrand) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Gender filter
      if (selectedGender !== 'All' && product.gender !== selectedGender && product.gender !== 'Unisex') {
        return false;
      }
      // Size filter
      if (selectedSizeFilter !== null && !product.sizes.includes(selectedSizeFilter)) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesColorway = product.colorway.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesColorway && !matchesCategory) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      // featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedBrand, selectedCategory, selectedGender, selectedSizeFilter, searchQuery, sortBy]);

  // Cart actions
  const handleAddToCart = (product: ShoeProduct, size: number, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, selectedSize: size, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, size: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string, size: number) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  const handleApplyPromo = (code: string) => {
    const cleanCode = code.toUpperCase();
    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    if (cleanCode === 'MARS10') {
      const discount = subtotal * 0.1;
      setAppliedPromo(cleanCode);
      setDiscountAmount(discount);
      return { success: true, message: 'Promo code MARS10 applied! (10% Off)' };
    }
    if (cleanCode === 'FREESHIP') {
      setAppliedPromo(cleanCode);
      return { success: true, message: 'Promo code FREESHIP applied! Free shipping unlocked.' };
    }
    return { success: false, message: 'Invalid promo code. Try "MARS10" or "FREESHIP".' };
  };

  // Wishlist actions
  const handleToggleWishlist = (product: ShoeProduct) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isProductWishlisted = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const handleSelectProductById = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) {
      setActiveProductModal(found);
    }
  };

  const handleClearFilters = () => {
    setSelectedBrand('All');
    setSelectedCategory('All');
    setSelectedGender('All');
    setSelectedSizeFilter(null);
    setSearchQuery('');
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafc] text-neutral-900 selection:bg-[#0a35e0] selection:text-white">
      {/* 3-Zone Header */}
      <Header
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSelectBrand={(brand) => {
          setSelectedBrand(brand);
          scrollToCatalog();
        }}
        selectedBrand={selectedBrand}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateSection={navigateToSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Campaign Hero Banner */}
        <Hero
          onExploreClick={scrollToCatalog}
          onBrandClick={(brand) => {
            setSelectedBrand(brand);
            scrollToCatalog();
          }}
        />

        {/* Brand Showcase Strip with Logos & Silhouettes Count */}
        <section className="bg-white border-b border-neutral-200/80 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {BRAND_STATS.map((b) => (
                <button
                  key={b.brand}
                  onClick={() => {
                    setSelectedBrand(b.brand as Brand);
                    scrollToCatalog();
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    selectedBrand === b.brand
                      ? 'border-[#0a35e0] bg-blue-50/40 shadow-xs ring-1 ring-[#0a35e0]'
                      : 'border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-50 bg-[#fafafc]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-lg font-black tracking-tighter text-neutral-950"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {b.logoText}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0a35e0] bg-blue-50 px-2 py-0.5 rounded">
                        Authorized
                      </span>
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">{b.tag}</div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-neutral-900 block">{b.count}</span>
                    <span className="text-[11px] text-[#0a35e0] font-medium">Explore &rarr;</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Primary Catalog Section */}
        <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Section Header with Clean Hierarchy */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                <span className="text-[#0a35e0] font-bold">Curated Catalog</span>
                <span aria-hidden="true">·</span>
                <span>{filteredProducts.length} Silhouettes Available</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-black text-neutral-950 mt-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {selectedBrand === 'All' ? 'All Footwear Drops' : `${selectedBrand} Footwear Vault`}
              </h2>
            </div>

            {/* Sort & Quick Filter Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-700 transition-colors cursor-pointer"
              >
                <Ruler size={14} className="text-[#0a35e0]" />
                <span>Size Guide</span>
              </button>

              <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs">
                <ArrowUpDown size={14} className="text-neutral-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort footwear"
                  className="bg-transparent text-neutral-800 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured Drops</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Releases</option>
                  <option value="rating">Top Customer Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Filter Controls Bar (Interactive Segmented Buttons) */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 mb-8 space-y-4 shadow-xs">
            {/* Top row: Brand tabs + Category tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Brand Selector */}
              <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
                {(['All', 'Nike', 'Adidas', 'Puma'] as (Brand | 'All')[]).map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      selectedBrand === brand
                        ? 'bg-white text-neutral-950 shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-950'
                    }`}
                  >
                    {brand === 'All' ? 'All Brands' : brand}
                  </button>
                ))}
              </div>

              {/* Gender Switcher */}
              <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl text-xs">
                {(['All', 'Unisex', 'Men', 'Women'] as ('All' | Gender)[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`px-3 py-1 font-semibold rounded-lg transition-colors cursor-pointer ${
                      selectedGender === g
                        ? 'bg-white text-neutral-950 shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-950'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom row: Categories & Size Quick Filter */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-100">
              {/* Categories */}
              <div className="flex flex-wrap items-center gap-1.5">
                {(
                  [
                    'All',
                    'Lifestyle & Terrace',
                    'Running & Performance',
                    'High-Tops & Basketball',
                    'Retro Classics',
                  ] as Category[]
                ).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#0a35e0] border-[#0a35e0] text-white shadow-xs'
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Reset filter trigger if filters active */}
              {(selectedBrand !== 'All' ||
                selectedCategory !== 'All' ||
                selectedGender !== 'All' ||
                selectedSizeFilter !== null ||
                searchQuery) && (
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 p-1 cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>

            {/* Size Filter Row */}
            <div className="pt-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-bold text-neutral-400 uppercase shrink-0">Filter Size:</span>
              <button
                onClick={() => setSelectedSizeFilter(null)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium shrink-0 cursor-pointer ${
                  selectedSizeFilter === null
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                All Sizes
              </button>
              {[7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSizeFilter(selectedSizeFilter === sz ? null : sz)}
                  className={`text-xs px-2.5 py-1 rounded-md font-semibold shrink-0 cursor-pointer ${
                    selectedSizeFilter === sz
                      ? 'bg-[#0a35e0] text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  US {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid: 3-column desktop / 2-column tablet per reference guidelines */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-neutral-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0a35e0] flex items-center justify-center mx-auto">
                <Search size={28} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-neutral-900">No footwear matched your criteria</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Try adjusting your search keywords, clearing size constraints, or selecting &quot;All Brands&quot;.
                </p>
              </div>
              <button
                onClick={handleClearFilters}
                className="bg-[#0a35e0] hover:bg-[#082cb8] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={isProductWishlisted(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onSelectProduct={(p) => setActiveProductModal(p)}
                  onQuickAdd={(p, size) => handleAddToCart(p, size, 1)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Authenticity Protocol & Provenance Section */}
        <AuthenticityGuarantee />

        {/* Lookbook / Streetwear Editorial Section */}
        <LookbookSection onSelectProductById={handleSelectProductById} />

        {/* Store Guarantees / Service Strip */}
        <section className="bg-white py-12 border-t border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STORE_PROMISES.map((promise, index) => (
                <div key={index} className="p-4 space-y-2 border-l-2 border-[#0a35e0]">
                  <h4 className="text-sm font-bold text-neutral-900">{promise.title}</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">{promise.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Editorial Footer */}
      <Footer
        onSelectBrand={(brand) => {
          setSelectedBrand(brand);
          scrollToCatalog();
        }}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onNavigateSection={navigateToSection}
      />

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={activeProductModal}
        isOpen={activeProductModal !== null}
        onClose={() => setActiveProductModal(null)}
        onAddToCart={(prod, sz, qty) => {
          handleAddToCart(prod, sz, qty);
          setIsCartOpen(true);
        }}
        isWishlisted={activeProductModal ? isProductWishlisted(activeProductModal.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        discountAmount={discountAmount}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discountAmount={discountAmount}
        appliedPromo={appliedPromo}
        onOrderCompleted={() => setCartItems([])}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        defaultBrand={selectedBrand === 'All' ? 'Nike' : selectedBrand}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectProduct={(p) => setActiveProductModal(p)}
      />
    </div>
  );
}
