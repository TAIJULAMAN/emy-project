(function(){
  const header=document.querySelector("[data-header]");
  const nav=document.querySelector("#main-nav");
  const toggle=document.querySelector(".nav-toggle");
  const form=document.querySelector("[data-contact-form]");
  const status=document.querySelector("[data-form-status]");
  function updateHeader(){if(header)header.classList.toggle("is-scrolled",window.scrollY>8)}
  updateHeader();
  window.addEventListener("scroll",updateHeader,{passive:true});
  if(toggle&&nav){
    toggle.addEventListener("click",()=>{const isOpen=nav.classList.toggle("is-open");toggle.setAttribute("aria-expanded",String(isOpen))});
    nav.addEventListener("click",event=>{if(event.target instanceof HTMLAnchorElement){nav.classList.remove("is-open");toggle.setAttribute("aria-expanded","false")}});
  }
  if(form&&status){
    form.addEventListener("submit",event=>{event.preventDefault();const data=new FormData(form);const name=String(data.get("name")||"").trim();status.textContent=name?`Thanks, ${name}. Your message is ready for EMY support.`:"Thanks. Your message is ready for EMY support.";form.reset()});
  }
})();
