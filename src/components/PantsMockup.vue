<script setup>
import { reactive, computed } from 'vue';
import { pantsConfig } from '../config/pants.config';

const partState = reactive({
    front: {
        "front-left":  { designUrl: null },
        "front-right": { designUrl: null },
    },
    back: {
        "back-left":  { designUrl: null },
        "back-right": { designUrl: null },
    }
});

const setDesign = (view, part, fileUrl) => {
    partState[view][part].designUrl = fileUrl;
}


const clearDesign = () => {
    partState.front['front-left'].designUrl = null;
    partState.front['front-right'].designUrl = null;
    partState.back['back-left'].designUrl = null;
    partState.back['back-right'].designUrl = null;
}

defineExpose({ setDesign, clearDesign });
</script>

<template>
  
  <div class="mockup-wrapper">
    <svg class="mockup-svg" viewBox="0 0 670 297">
      <defs>
        <clipPath id="clipPath157"><path d="m 3904.1281,5503.6007 v 0 c -2.0061,-0.3253 -5.9893,-0.01 -15.9705,0.8593 -20.3433,1.7634 -71.7986,-0.2931 -109.6189,-4.2207 -0.4131,-0.038 -0.8239,-0.086 -1.2332,-0.1295 l -9.918,71.2259 -5.0824,78.6102 -9.2521,106.6364 h -4e-4 c 0.219,0.1567 0.3797,0.338 0.4755,0.5425 0.7502,1.6035 0.3975,12.6136 -1.3565,42.4374 -0.9202,15.6427 -0.7007,19.7358 1.5911,29.6867 7.8801,34.2183 19.3063,89.1693 22.8914,110.0958 3.855,22.5009 5.0194,32.6943 10.3064,90.1646 1.1878,12.9114 3.1587,34.3253 4.3796,47.5858 1.221,13.2606 3.262,32.7045 4.5351,43.2092 4.203,34.6846 10.4189,113.0348 10.9916,138.544 0.3289,14.6396 0.849,15.6629 7.5426,14.8494 2.8012,-0.3405 17.549,-0.8653 32.7735,-1.1659 15.2247,-0.3007 32.7949,-0.7956 39.0444,-1.0998 6.2492,-0.3044 16.9507,-0.7199 23.7805,-0.9237 12.7294,-0.3794 17.3587,-1.9999 17.8537,-6.2499 0.1399,-1.2011 -0.3764,-13.4603 -1.146,-27.2428 -0.7697,-13.7822 -1.3026,-33.8033 -1.1838,-44.4912 0.1188,-10.6881 0.1481,-30.4572 0.062,-43.9307 -0.086,-13.4735 0.117,-39.1525 0.4522,-57.065 0.3351,-17.9123 0.5028,-38.7938 0.3729,-46.4038 -0.1299,-7.6099 -0.079,-25.1168 0.1136,-38.9031 0.1922,-13.7864 0.2794,-31.5692 0.1938,-39.5192 -0.061,-5.6382 -0.088,-11.658 -0.083,-17.9625 l -0.4121,0.8404 -14.3161,-413.8075 0.6796,0.4191 c -0.7954,-3.0475 -1.366,-6.9982 -1.3628,-9.8078 -1e-4,-3.5772 -0.796,-8.5666 -1.7779,-11.0873 -0.982,-2.5208 -1.6789,-5.4986 -1.5487,-6.6174 0.1303,-1.1189 -0.513,-2.8203 -1.4306,-3.7814 -0.6489,-0.6802 -1.1413,-1.1077 -2.3448,-1.3029 z" /></clipPath>
        <clipPath id="clipPath156"><path d="m 4764.1539,4547.9579 c -2.5418,0.227 -2.9466,1.4093 -2.6687,4.0724 0.1701,1.6299 -0.8606,4.5232 -2.2902,6.4293 -1.9417,2.5895 -2.5943,5.5562 -2.5826,11.733 0.01,4.2637 -0.5445,8.9301 -1.2548,10.7885 l -16.8702,311.8036 h 2e-4 10e-5 c 0.3796,8.9516 0.7954,18.1465 1.2475,27.5779 2.4576,51.2721 3.6539,85.0743 4.1771,118.0372 0.3006,18.9305 0.8494,43.1321 1.2203,53.7811 0.3712,10.6489 0.8827,32.0331 1.1362,47.5211 0.2534,15.4878 0.7618,44.4889 1.1296,64.4469 0.7123,38.6617 0.5563,59.366 -0.6392,84.6898 -0.9244,19.5866 -0.7803,21.0465 2.148,21.6501 3.0962,0.6386 94.7948,4.8354 107.2808,4.91 2.415,0.015 5.0286,0.051 5.8091,0.079 3.7128,0.1375 4.0777,-2.8355 5.2776,-42.9742 0.4652,-15.5622 2.7245,-45.5775 6.8491,-90.9807 5.1914,-57.1422 8.6526,-99.7494 11.5602,-142.3082 3.2586,-47.6971 8.5654,-81.3218 22.8232,-144.6118 10.2174,-45.3544 10.0529,-42.5057 4.4588,-77.091 l -2.7165,-16.7941 3.8889,-1.2088 c 1.8831,-0.5855 3.4404,-0.6848 4.3326,-0.3066 l -6e-4,-0.01 -14.2337,-106.0864 -12.189,-77.8257 -5.859,-71.6739 c -2.402,0.2757 -4.7483,0.5316 -7.0289,0.7666 -33.2048,3.4096 -94.9801,5.7532 -107.808,4.0896 -3.3789,-0.4383 -5.6727,-0.6474 -7.1979,-0.5113 z" /></clipPath>
        <clipPath id="clipPath163"><path d="m 6847.6649,5032.9246 c -3.7974,0.6937 -3.4262,2.1377 -3.76,5.2219 -0.3051,2.8212 -1.6324,6.546 -2.9507,8.2766 -1.8605,2.4424 -2.2025,4.5549 -1.5265,9.4401 0.3639,2.6291 0.3153,5.8126 -0.066,8.0435 l 1.2422,0.034 -7.5572,332.893 c 3.8899,53.2091 6.8584,104.5539 7.9846,138.914 1.1907,36.3141 2.2157,56.9968 3.8712,78.1382 3.8788,49.5401 8.0409,153.1934 6.9873,174.0051 -0.6097,12.0421 -0.5589,12.3262 2.377,13.4111 1.3442,0.4965 12.0018,0.7657 23.6847,0.5978 11.6828,-0.164 33.4126,-0.2764 48.2886,-0.243 14.876,0.033 30.9282,-0.3718 35.6707,-0.9003 l 8.622,-0.9597 0.3151,-4.4503 c 0.1726,-2.4472 0.2506,-11.5209 0.1729,-20.1644 -0.1782,-19.7741 2.4241,-91.5149 4.8411,-133.472 0.6032,-10.4685 1.4222,-29.2759 1.8216,-41.7932 1.4459,-45.3296 3.9546,-100.3434 5.3136,-116.5435 2.1869,-26.0659 1.7166,-22.8429 16.8873,-115.6288 1.5058,-9.2087 2.5184,-20.4957 2.2507,-25.0819 -0.4215,-7.2176 -0.903,-8.7384 -3.5797,-11.3173 -1.7008,-1.6385 -3.2245,-3.8761 -3.3764,-4.9733 -0.1519,-1.0972 -2.8077,-7.8045 -5.8923,-14.9054 -3.084,-7.101 -5.488,-13.5585 -5.3397,-14.3503 0.01,-0.013 0,-0.025 0.01,-0.037 10e-5,-2e-4 -5e-4,-6e-4 -2e-4,1e-4 l -0.041,-0.081 c 5.2691,-22.0558 15.1754,-29.057 7.1283,-94.3316 l -22.3617,-176.3358 c -4.0143,0.6181 -6.8003,0.9148 -7.9217,0.7928 -1.5161,-0.1652 -15.5899,0.8834 -31.2754,2.3298 -15.7045,1.448 -39.5421,2.6842 -53.0499,2.751 -17.0061,0.084 -24.9723,0.028 -28.7697,0.7215 z" /></clipPath>
        <clipPath id="clipPath165"><path d="m 5382.1687,6798.0307 h -4e-4 c -0.289,-0.031 -0.5718,-0.022 -0.8426,0.033 -8.8933,1.7916 -90.8327,-3.4797 -117.417,-7.0591 l -28.3894,175.4661 c -10.7303,64.8875 -22.2113,68.8031 -33.4994,88.4704 l 0.016,0.09 c 0.3912,-0.6229 1.7242,1.2008 2.995,4.1107 6.981,15.9864 9.282,23.1106 12.627,39.0834 2.0235,9.6614 6.6682,30.4978 10.3208,46.303 10.8468,46.9333 16.3457,80.2067 19.4462,117.66 0.7557,9.1289 1.7084,19.7692 2.1161,23.6446 0.4076,3.8754 1.1818,19.5948 1.7196,34.9324 0.5381,15.3376 2.1783,47.9253 3.6466,72.4181 5.4677,91.1953 7.0815,129.3642 6.5207,154.1776 -0.2422,10.7128 -0.461,19.6158 -0.4863,19.7854 -0.2438,1.6245 15.7364,1.8586 90.5342,1.3255 22.8809,-0.163 30.4954,-1.2135 30.9544,-4.2705 0.1027,-0.6828 -0.055,-12.75 -0.3487,-26.8167 -0.2938,-14.0663 1e-4,-38.829 0.658,-55.0277 0.655,-16.1985 1.4526,-38.4902 1.7732,-49.5378 0.3204,-11.0477 1.1241,-29.6522 1.7861,-41.342 1.7182,-30.339 4.3251,-88.3883 5.7091,-127.1223 1.0522,-29.4433 1.76,-46.8878 3.2904,-72.2155 l -0.9398,2.9345 -5.5026,-372.5581 1.7289,1.6038 c -0.073,-1.368 -0.03,-2.6165 0.1313,-3.6928 0.509,-3.3899 0.081,-6.5021 -1.2062,-8.7627 -1.0978,-1.9282 -1.8006,-4.8046 -1.5621,-6.393 0.4358,-2.9025 -2.9839,-6.9435 -5.7783,-7.2427 z" /></clipPath>
      </defs>

      <g id="front" transform="matrix(0.36426857,0,0,0.36426857,-1406.4805,-1818.9198)">
        <path :d="pantsConfig.views.front.shadow.path" :fill="pantsConfig.views.front.shadow.fill" :opacity="pantsConfig.views.front.shadow.opacity" />

        <image
          v-if="partState.front['front-left'].designUrl"
          :href="partState.front['front-left'].designUrl"
          :x="pantsConfig.views.front.designParts['front-left'].bbox.x"
          :y="pantsConfig.views.front.designParts['front-left'].bbox.y"
          :width="pantsConfig.views.front.designParts['front-left'].bbox.width"
          :height="pantsConfig.views.front.designParts['front-left'].bbox.height"
          preserveAspectRatio="xMidYMid slice"
          :clip-path="`url(#${pantsConfig.views.front.designParts['front-left'].clipId})`"
          transform="rotate(-6.6432722)"
        />
        <image
          v-if="partState.front['front-right'].designUrl"
          :href="partState.front['front-right'].designUrl"
          :x="pantsConfig.views.front.designParts['front-right'].bbox.x"
          :y="pantsConfig.views.front.designParts['front-right'].bbox.y"
          :width="pantsConfig.views.front.designParts['front-right'].bbox.width"
          :height="pantsConfig.views.front.designParts['front-right'].bbox.height"
          preserveAspectRatio="xMidYMid slice"
          :clip-path="`url(#${pantsConfig.views.front.designParts['front-right'].clipId})`"
          transform="rotate(5.9572613)"
        />

        <image 
          :href="pantsConfig.views.front.overlay" 
          :x="pantsConfig.views.front.overlayBbox.x" 
          :y="pantsConfig.views.front.overlayBbox.y" 
          :width="pantsConfig.views.front.overlayBbox.width" 
          :height="pantsConfig.views.front.overlayBbox.height"
          :style="{mixBlendMode : partState.front['front-right'].designUrl === null ? 'difference' : 'overlay'}" />
      </g>
      
      <g id="back" transform="matrix(0.36426857,0,0,0.36426857,-1787.1585,-2150.339)">
        <path :d="pantsConfig.views.back.shadow.path" :fill="pantsConfig.views.back.shadow.fill" :opacity="pantsConfig.views.back.shadow.opacity" />
        
        <g transform="translate(2.2876902e-6)">
          <image
            v-if="partState.back['back-left'].designUrl"
            :href="partState.back['back-left'].designUrl"
            :x="pantsConfig.views.back.designParts['back-left'].bbox.x"
            :y="pantsConfig.views.back.designParts['back-left'].bbox.y"
            :width="pantsConfig.views.back.designParts['back-left'].bbox.width"
            :height="pantsConfig.views.back.designParts['back-left'].bbox.height"
            preserveAspectRatio="xMidYMid slice"
            :clip-path="`url(#${pantsConfig.views.back.designParts['back-left'].clipId})`"
            transform="rotate(7.8785105)"
          />
          <image
            v-if="partState.back['back-right'].designUrl"
            :href="partState.back['back-right'].designUrl"
            :x="pantsConfig.views.back.designParts['back-right'].bbox.x"
            :y="pantsConfig.views.back.designParts['back-right'].bbox.y"
            :width="pantsConfig.views.back.designParts['back-right'].bbox.width"
            :height="pantsConfig.views.back.designParts['back-right'].bbox.height"
            preserveAspectRatio="xMidYMid slice"
            :clip-path="`url(#${pantsConfig.views.back.designParts['back-right'].clipId})`"
            transform="rotate(-8.539242)"
          />
        </g>
        
        <image 
          :href="pantsConfig.views.back.overlay" 
          :x="pantsConfig.views.back.overlayBbox.x" 
          :y="pantsConfig.views.back.overlayBbox.y" 
          :width="pantsConfig.views.back.overlayBbox.width" 
          :height="pantsConfig.views.back.overlayBbox.height" 
          :style="{mixBlendMode : partState.back['back-right'].designUrl === null ? 'difference' : 'overlay'}"  
          transform="matrix(2.7452273,0,0,2.7452273,4848.0485,5903.1692)" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
  .mockup-wrapper {
      display: flex;
      flex-direction: row;
      gap: 24px;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
  }
  .mockup-svg {
      flex: 1;
      max-width: 90%;
      height: auto;
  }
</style>