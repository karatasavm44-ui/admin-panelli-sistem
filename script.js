async function loadJSON(url){ const r = await fetch(url); return await r.json(); }
async function init(){
  const site = await loadJSON('site.json');
  const data = await loadJSON('products.json');
  const wan = site.wanumber || '';
  const brandName = site.brand_name || 'Marka Adı';
  const tagline = site.tagline || '';
  document.querySelector('#brand-name').textContent = brandName;
  document.querySelector('#brand-sub').textContent = tagline;
  document.querySelector('#brand-copy').textContent = brandName;
  const waBase = (text='Merhaba, ürün hakkında bilgi almak istiyorum') => `https://wa.me/${wan}?text=${encodeURIComponent(text)}`;
  ['hero-wa','band-wa','wa-inline','wa-float','mob-wa'].forEach(id=>{ const el=document.getElementById(id); if(el) el.href = waBase('Merhaba, ürünlerinizle ilgili bilgi almak istiyorum.'); });
  const grid = document.getElementById('products-grid'); grid.innerHTML='';
  for(const p of (data.items||[])){
    const card = document.createElement('article'); card.className='card'; card.dataset.title=p.title||'Ürün'; card.dataset.sku=p.sku||'';
    card.innerHTML = `
      <img src="${p.image||''}" alt="${p.title||''}">
      <div class="p-body">
        <div class="p-title">${p.title||''}</div>
        <div class="price">
          ${p.price_old ? `<span class="old">₺${p.price_old}</span>` : ''}
          ${p.price_new ? `<span class="new">₺${p.price_new}</span>` : ''}
        </div>
        ${p.badge ? `<div class="pill">${p.badge}</div>` : ''}
        <button class="btn wa-btn">WhatsApp ile Sipariş Ver</button>
      </div>`;
    card.querySelector('.wa-btn').addEventListener('click', ()=>{
      const sku = p.sku ? ` (SKU: ${p.sku})` : '';
      const msg = `Merhaba, ${p.title||'Ürün'}${sku} hakkında bilgi almak istiyorum.`;
      window.open(waBase(msg),'_blank');
    });
    grid.appendChild(card);
  }
  document.getElementById('yil').textContent = new Date().getFullYear();
}
document.addEventListener('DOMContentLoaded', init);
const drawer=document.getElementById('drawer'); const hamb=document.getElementById('hamb');
function closeDrawer(){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); }
hamb?.addEventListener('click',()=>{ drawer.classList.toggle('open'); drawer.setAttribute('aria-hidden', drawer.classList.contains('open')?'false':'true'); });
