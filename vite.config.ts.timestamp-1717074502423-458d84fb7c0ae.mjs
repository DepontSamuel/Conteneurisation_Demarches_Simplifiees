// vite.config.ts
import { defineConfig } from "file:///app/node_modules/vite/dist/node/index.js";
import ViteReact from "file:///app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import ViteLegacy from "file:///app/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import FullReload from "file:///app/node_modules/vite-plugin-full-reload/dist/index.js";
import RubyPlugin from "file:///app/node_modules/vite-plugin-ruby/dist/index.js";
var plugins = [
  RubyPlugin(),
  ViteReact({ jsxRuntime: "classic" }),
  FullReload(
    ["config/routes.rb", "app/views/**/*", "app/components/**/*.haml"],
    { delay: 200 }
  )
];
if (shouldBuildLegacy()) {
  plugins.push(
    ViteLegacy({
      targets: [
        "defaults",
        "Chrome >= 50",
        "Edge >= 14",
        "Firefox >= 50",
        "Opera >= 40",
        "Safari >= 8",
        "iOS >= 8",
        "IE >= 11"
      ],
      additionalLegacyPolyfills: [
        "dom4",
        "core-js/stable",
        "@stimulus/polyfills",
        "turbo-polyfills",
        "intersection-observer",
        "regenerator-runtime/runtime",
        "whatwg-fetch",
        "yet-another-abortcontroller-polyfill"
      ]
    })
  );
}
var vite_config_default = defineConfig({
  resolve: { alias: { "@utils": "/shared/utils.ts" } },
  build: { sourcemap: true },
  plugins
});
function shouldBuildLegacy() {
  if (process.env.VITE_LEGACY == "disabled") {
    return false;
  }
  return process.env.RAILS_ENV == "production" || process.env.VITE_LEGACY == "enabled";
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvYXBwL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBWaXRlUmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IFZpdGVMZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5JztcbmltcG9ydCBGdWxsUmVsb2FkIGZyb20gJ3ZpdGUtcGx1Z2luLWZ1bGwtcmVsb2FkJztcbmltcG9ydCBSdWJ5UGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLXJ1YnknO1xuXG5jb25zdCBwbHVnaW5zID0gW1xuICBSdWJ5UGx1Z2luKCksXG4gIFZpdGVSZWFjdCh7IGpzeFJ1bnRpbWU6ICdjbGFzc2ljJyB9KSxcbiAgRnVsbFJlbG9hZChcbiAgICBbJ2NvbmZpZy9yb3V0ZXMucmInLCAnYXBwL3ZpZXdzLyoqLyonLCAnYXBwL2NvbXBvbmVudHMvKiovKi5oYW1sJ10sXG4gICAgeyBkZWxheTogMjAwIH1cbiAgKVxuXTtcblxuaWYgKHNob3VsZEJ1aWxkTGVnYWN5KCkpIHtcbiAgcGx1Z2lucy5wdXNoKFxuICAgIFZpdGVMZWdhY3koe1xuICAgICAgdGFyZ2V0czogW1xuICAgICAgICAnZGVmYXVsdHMnLFxuICAgICAgICAnQ2hyb21lID49IDUwJyxcbiAgICAgICAgJ0VkZ2UgPj0gMTQnLFxuICAgICAgICAnRmlyZWZveCA+PSA1MCcsXG4gICAgICAgICdPcGVyYSA+PSA0MCcsXG4gICAgICAgICdTYWZhcmkgPj0gOCcsXG4gICAgICAgICdpT1MgPj0gOCcsXG4gICAgICAgICdJRSA+PSAxMSdcbiAgICAgIF0sXG4gICAgICBhZGRpdGlvbmFsTGVnYWN5UG9seWZpbGxzOiBbXG4gICAgICAgICdkb200JyxcbiAgICAgICAgJ2NvcmUtanMvc3RhYmxlJyxcbiAgICAgICAgJ0BzdGltdWx1cy9wb2x5ZmlsbHMnLFxuICAgICAgICAndHVyYm8tcG9seWZpbGxzJyxcbiAgICAgICAgJ2ludGVyc2VjdGlvbi1vYnNlcnZlcicsXG4gICAgICAgICdyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUnLFxuICAgICAgICAnd2hhdHdnLWZldGNoJyxcbiAgICAgICAgJ3lldC1hbm90aGVyLWFib3J0Y29udHJvbGxlci1wb2x5ZmlsbCdcbiAgICAgIF1cbiAgICB9KVxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7IGFsaWFzOiB7ICdAdXRpbHMnOiAnL3NoYXJlZC91dGlscy50cycgfSB9LFxuICBidWlsZDogeyBzb3VyY2VtYXA6IHRydWUgfSxcbiAgcGx1Z2luc1xufSk7XG5cbmZ1bmN0aW9uIHNob3VsZEJ1aWxkTGVnYWN5KCkge1xuICBpZiAocHJvY2Vzcy5lbnYuVklURV9MRUdBQ1kgPT0gJ2Rpc2FibGVkJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHByb2Nlc3MuZW52LlJBSUxTX0VOViA9PSAncHJvZHVjdGlvbicgfHxcbiAgICBwcm9jZXNzLmVudi5WSVRFX0xFR0FDWSA9PSAnZW5hYmxlZCdcbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOEwsU0FBUyxvQkFBb0I7QUFDM04sT0FBTyxlQUFlO0FBQ3RCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBRXZCLElBQU0sVUFBVTtBQUFBLEVBQ2QsV0FBVztBQUFBLEVBQ1gsVUFBVSxFQUFFLFlBQVksVUFBVSxDQUFDO0FBQUEsRUFDbkM7QUFBQSxJQUNFLENBQUMsb0JBQW9CLGtCQUFrQiwwQkFBMEI7QUFBQSxJQUNqRSxFQUFFLE9BQU8sSUFBSTtBQUFBLEVBQ2Y7QUFDRjtBQUVBLElBQUksa0JBQWtCLEdBQUc7QUFDdkIsVUFBUTtBQUFBLElBQ04sV0FBVztBQUFBLE1BQ1QsU0FBUztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsMkJBQTJCO0FBQUEsUUFDekI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsRUFBRSxPQUFPLEVBQUUsVUFBVSxtQkFBbUIsRUFBRTtBQUFBLEVBQ25ELE9BQU8sRUFBRSxXQUFXLEtBQUs7QUFBQSxFQUN6QjtBQUNGLENBQUM7QUFFRCxTQUFTLG9CQUFvQjtBQUMzQixNQUFJLFFBQVEsSUFBSSxlQUFlLFlBQVk7QUFDekMsV0FBTztBQUFBLEVBQ1Q7QUFDQSxTQUNFLFFBQVEsSUFBSSxhQUFhLGdCQUN6QixRQUFRLElBQUksZUFBZTtBQUUvQjsiLAogICJuYW1lcyI6IFtdCn0K
