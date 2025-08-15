"use client";
export function ThemeScript(){
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',t|| (m?'dark':'light'));}catch(e){}})();`
      }}
    />
  );
}
