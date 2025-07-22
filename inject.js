(function () {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }

  async function inject() {
    try {
      const res = await fetch("https://tkftravelagency.netlify.app/cat.json");
      if (!res.ok) throw new Error(`Failed to load: ${res.status}`);

      const config = await res.json();
      if (!config || typeof config !== "object") throw new Error("Invalid JSON format");

      let finalCSS = "";

      // ========== Inject Regular CSS ========== //
      if (Array.isArray(config.css)) {
        for (const item of config.css) {
          if (typeof item === "string") {
            // External CSS file
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = item;
            document.head.appendChild(link);
            console.log(`Injected external CSS file: ${item}`);
          } else if (typeof item === "object") {
            for (const [selector, ruleOrObject] of Object.entries(item)) {
              let rules, force;
      
              if (typeof ruleOrObject === "object") {
                rules = ruleOrObject.css;
                force = ruleOrObject.force === true;
              } else {
                rules = ruleOrObject;
                force = false;
              }
      
              if (force || document.querySelector(selector)) {
                finalCSS += `${selector} { ${rules} }\n`;
                console.log(`Injected CSS: ${selector}${force ? " (forced)" : ""}`);
              } else {
                console.log(`Skipped CSS: ${selector}`);
              }
            }
          }
        }
      }
      
      /* if (Array.isArray(config.css)) {
        config.css.forEach(cssItem => {
          if (typeof cssItem === "string") {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = cssItem;
            document.head.appendChild(link);
            console.log(`Injected external CSS file: ${cssItem}`);
          }
        });
      }
      
      if (config.css && typeof config.css === "object") {
        for (const [selector, ruleOrObject] of Object.entries(config.css)) {
          let rules, force;

          if (typeof ruleOrObject === "object") {
            rules = ruleOrObject.css;
            force = ruleOrObject.force === true;
          } else {
            rules = ruleOrObject;
            force = false;
          }

          if (force || document.querySelector(selector)) {
            finalCSS += `${selector} { ${rules} }\n`;
            console.log(`Injected CSS: ${selector}${force ? " (forced)" : ""}`);
          } else {
            console.log(`Skipped CSS: ${selector}`);
          }
        }
      }*/

      // ========== Inject Media Queries ========== //
      if (config.media && typeof config.media === "object") {
        for (const [mediaQuery, rules] of Object.entries(config.media)) {
          let mediaCSS = "";
          for (const [selector, ruleOrObject] of Object.entries(rules)) {
            let rules, force;

            if (typeof ruleOrObject === "object") {
              rules = ruleOrObject.css;
              force = ruleOrObject.force === true;
            } else {
              rules = ruleOrObject;
              force = false;
            }

            if (force || document.querySelector(selector)) {
              mediaCSS += `${selector} { ${rules} }\n`;
              console.log(`Media Injected: ${selector} in ${mediaQuery}${force ? " (forced)" : ""}`);
            }
          }
          if (mediaCSS) {
            finalCSS += `${mediaQuery} {\n${mediaCSS}}\n`;
          }
        }
      }

      // ========== Append <style> tag ========== //
      if (finalCSS) {
        const styleTag = document.createElement("style");
        styleTag.textContent = finalCSS;
        document.head.appendChild(styleTag);
      }

      // ========== Inject Custom JS ========== //
      if (Array.isArray(config.js)) {
        config.js.forEach(script => {
          if (typeof script === "string") {
            const tag = document.createElement("script");
            tag.src = script;
            tag.async = true;
            tag.onload = () => console.log(`Loaded external JS: ${script}`);
            tag.onerror = () => console.error(`Failed to load external JS: ${script}`);
            document.head.appendChild(tag);
          }
        });
      }
      
      if (Array.isArray(config.js)) {
        config.js.forEach(script => {
          if (!script.run) return;

          const runOnceKey = `__injected_js_${script.id || script.src || Math.random().toString(36).substr(2)}`;
          if (script.once && window[runOnceKey]) {
            console.log(`Skipped (already ran): ${runOnceKey}`);
            return;
          }

          const runScript = () => {
            try {
              if (script.type === "external" && script.src) {
                if (!document.querySelector(`script[src="${script.src}"]`)) {
                  const tag = document.createElement("script");
                  tag.src = script.src;
                  tag.async = true;
                  tag.onload = () => {
                    console.log(`Loaded JS file: ${script.src}`);
                    if (script.once) window[runOnceKey] = true;
                  };
                  tag.onerror = () => console.error(`Failed to load JS file: ${script.src}`);
                  document.head.appendChild(tag);
                } else {
                  console.log(`Skipped duplicate external JS: ${script.src}`);
                }
              } else if (script.type === "inline" && script.code) {
                const fn = new Function(script.code);
                fn();
                console.log(`Executed inline JS: ${script.id || "unknown"}`);
                if (script.once) window[runOnceKey] = true;
              }
            } catch (e) {
              console.error(`Error running JS (${script.id || "unknown"}):`, e);
            }
          };

          if (document.readyState === "complete") {
            runScript();
          } else {
            window.addEventListener("load", runScript);
          }
        });
      }
    } catch (err) {
      console.error("Inject.js error:", err.message);
    }
  }
})();
