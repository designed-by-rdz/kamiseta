<script setup>
import { reactive, computed } from 'vue';
import { shirtConfig } from '../config/tshirt.config';

const partState = reactive({
    front: {
        "base-color":   { fill: '#151515' },
        "front-collar":      { fill: '#151515' },
        "front-design":      { designUrl: null },
        "front-left-sleeve":  { designUrl: null },
        "front-right-sleeve": { designUrl: null },
    },
    back: {
        "back-collar":      { fill: '#151515' },
        "back-design":      { designUrl: null },
        "back-left-sleeve":  { designUrl: null },
        "back-right-sleeve": { designUrl: null },
    }
});

const setDesign = (view, part, fileUrl) => {
    partState[view][part].designUrl = fileUrl;
}

const setColor = (view, part, hex) => {
    partState[view][part].fill = hex;
}

const clearDesign = () => {
    partState.front['base-color'].fill = '#151515';
    partState.front['front-collar'].fill = '#151515';
    partState.front['front-design'].designUrl = null;
    partState.front['front-left-sleeve'].designUrl = null;
    partState.front['front-right-sleeve'].designUrl = null;
    partState.back['back-collar'].fill = '#151515';
    partState.back['back-design'].designUrl = null;
    partState.back['back-left-sleeve'].designUrl = null;
    partState.back['back-right-sleeve'].designUrl = null;
}

defineExpose({ setDesign, setColor, clearDesign });
</script>

<template>
  
  <div class="mockup-wrapper">
    <svg class="mockup-svg" viewBox="0 0 670 297">
      <defs>
        <clipPath id="clipPath73728"><path d="m 4822.4427,5223.4489 -105.4367,120.9931 -63.9535,-58.7681 -12.0994,-1.7286 -1.7286,280.0128 1.7286,96.7946 10.3708,88.1523 -3.457,27.6556 -48.3973,-5.1856 -98.5229,3.4571 h -209.1455 l -76.0529,-1.7285 -65.682,-3.4571 12.0994,-112.3508 -1.7285,-179.7611 -8.6424,-179.7614 -5.1853,-17.2847 -19.0132,25.9271 -44.9405,29.3841 -93.3376,-115.8079 153.8343,-107.1655 32.8409,-24.1985 74.3243,-27.6556 76.0529,-27.6555 c 51.5292,22.1744 99.9882,19.7876 146.9205,5.1853 l 29.3841,15.5564 124.4499,34.5694 143.4635,101.9799 z" /></clipPath>
        <clipPath id="clipPath73731"><path d="m 5178.649,1068.9648 -78.8926,27.6553 -77.0999,27.6556 6.6757,27.668 c 10.1561,36.9393 11.3245,74.5969 3.5052,112.9742 -5.2901,27.1483 -17.051,49.9829 -35.2832,68.5032 l 8.9654,179.7616 1.7925,179.7611 -12.551,112.3509 68.135,3.4565 78.8932,1.7285 h 216.9557 l 102.2021,-3.4571 50.2047,5.1859 3.5862,-27.6559 -10.758,-88.152 -1.7936,-96.7946 1.7936,-280.0131 v 0 c -29.9474,-25.4825 -30.6101,-68.7903 -35.1186,-109.7576 0.8461,-41.1104 7.771,-69.6304 20.7745,-85.5596 l -129.0971,-34.5694 -30.4818,-15.5562 c -0.077,62.0207 -27.3823,92.6775 -81.915,91.9705 -57.1873,1.8219 -97.7448,-71.4047 -70.4924,-97.1558 z m 152.399,5.1879 c -25.3183,7.5931 -51.0649,11.8822 -77.465,11.1311 25.4005,0.8649 51.2223,-2.8454 77.465,-11.1311 z" /></clipPath>
        <clipPath id="clipPath14"><path d="m -741.26853,6836.7869 c -20.54632,0.823 -46.49065,14.543 -77.83243,41.1602 -27.6851,30.5315 -59.67189,59.7351 -58.90042,99.0495 l 7.02558,10.5434 -0.026,88.6286 163.09253,1.6898 -11.06668,-62.0447 z" /></clipPath>
        <clipPath id="clipPath15"><path d="m -6571.0415,-18.050617 2.7181,41.698773 17.53,191.422544 -150.937,-2.06019 -6.6129,-54.70849 7.6728,-31.65999 -16.8043,6.73139 c 2.867,-25.83011 13.1637,-49.361207 30.8901,-70.5933 24.8425,-30.278448 54.7974,-53.129851 89.8648,-68.5546124 z" /></clipPath>
        <clipPath id="clipPath1"><path d="m 4285.2611,5770.1595 -4.0942,19.4477 4.0942,25.5891 -1.0234,95.1918 -2.0471,134.0874 -1.0237,74.7205 8.1886,100.3096 -1.0236,36.8483 -80.8617,-1.0235 -132.0404,4.0942 -101.333,-1.0237 h -55.2728 l -49.131,-4.0941 -61.4143,1.0236 -16.3769,-1.0236 7.1649,-152.5114 v -67.5555 l -5.1178,-140.2287 -1.0237,-89.0505 2.0474,-12.2828 -3.0708,-15.3535 c 40.7517,-64.235 50.6405,-151.7978 19.4477,-208.8076 l 67.5555,-22.5187 61.414,-19.4476 5.696,-0.3337 18.5796,-9.9091 c 48.6169,14.2443 96.8208,13.6249 144.612,-1.8582 l 5.5737,6.8127 4.3352,1.2386 11.1479,5.5739 12.3865,1.2386 61.6225,18.5798 61.0034,24.4634 c -16.6185,55.9453 -19.1992,112.3037 -2.7871,171.5521 12.1324,24.8528 19.7231,33.6031 22.7724,26.2509 z" /></clipPath>
        <clipPath id="clipPath17"><path d="m -6839.2234,990.46534 13.9336,-1.03741 c -6.4092,20.01137 -7.1573,38.31957 -2.2446,54.92487 l 6.1016,22.3077 5.204,8.214 146.3776,-0.9672 -13.9129,-128.29946 -12.0085,-108.1154 c -61.8729,14.37486 -121.408,74.08579 -143.4508,152.9729 z" /></clipPath>
        <clipPath id="clipPath16"><path d="m -1479.7693,7033.3837 7.8036,2.3805 -1.71,6.4771 -6.1262,28.5841 2.4068,18.1345 1.5365,28.8307 79.8483,0.031 73.6297,-2.3216 2.7822,-2.463 -7.3925,-84.0293 -11.0798,-91.931 -6.8436,-49.7743 c -55.8357,23.5838 -99.3473,62.105 -130.2951,111.6297 -10.4377,24.6681 -13.1973,39.3644 -4.5599,34.4514 z" /></clipPath>
      </defs>

      <g id="front" transform="matrix(0.36426857,0,0,0.36426857,-1427.6473,-1818.9198)">
        <path :d="shirtConfig.views.front.shadow.path" :fill="shirtConfig.views.front.shadow.fill" :opacity="shirtConfig.views.front.shadow.opacity" />
        <path :d="shirtConfig.views.front.colorParts['base-color'].path" :fill="partState.front['base-color'].fill" />

        <image
          v-if="partState.front['front-design'].designUrl"
          :href="partState.front['front-design'].designUrl"
          :x="shirtConfig.views.front.designParts['front-design'].bbox.x"
          :y="shirtConfig.views.front.designParts['front-design'].bbox.y"
          :width="shirtConfig.views.front.designParts['front-design'].bbox.width"
          :height="shirtConfig.views.front.designParts['front-design'].bbox.height"
          preserveAspectRatio="xMidYMid slice"
          :clip-path="`url(#${shirtConfig.views.front.designParts['front-design'].clipId})`"
          transform="translate(-863.04537,3962.6236)"
          
        />
        <image
          v-if="partState.front['front-left-sleeve'].designUrl"
          :href="partState.front['front-left-sleeve'].designUrl"
          :x="shirtConfig.views.front.designParts['front-left-sleeve'].bbox.x"
          :y="shirtConfig.views.front.designParts['front-left-sleeve'].bbox.y"
          :width="shirtConfig.views.front.designParts['front-left-sleeve'].bbox.width"
          :height="shirtConfig.views.front.designParts['front-left-sleeve'].bbox.height"
          preserveAspectRatio="xMidYMid slice"
          :clip-path="`url(#${shirtConfig.views.front.designParts['front-left-sleeve'].clipId})`"
          transform="rotate(-48.48106)"
        />
        <image
          v-if="partState.front['front-right-sleeve'].designUrl"
          :href="partState.front['front-right-sleeve'].designUrl"
          :x="shirtConfig.views.front.designParts['front-right-sleeve'].bbox.x"
          :y="shirtConfig.views.front.designParts['front-right-sleeve'].bbox.y"
          :width="shirtConfig.views.front.designParts['front-right-sleeve'].bbox.width"
          :height="shirtConfig.views.front.designParts['front-right-sleeve'].bbox.height"
          preserveAspectRatio="xMidYMid slice"
          :clip-path="`url(#${shirtConfig.views.front.designParts['front-right-sleeve'].clipId})`"
          transform="matrix(-0.6308903,-0.77587204,-0.77587204,0.6308903,0,0)"
        />
        <path :d="shirtConfig.views.front.colorParts['front-collar'].path" :fill="partState.front['front-collar'].fill" />

        <image 
          :href="shirtConfig.views.front.overlay" 
          :x="shirtConfig.views.front.overlayBbox.x" 
          :y="shirtConfig.views.front.overlayBbox.y" 
          :width="shirtConfig.views.front.overlayBbox.width" 
          :height="shirtConfig.views.front.overlayBbox.height"
          :style="{mixBlendMode : partState.front['front-design'].designUrl === null ? 'difference' : 'overlay'}"
          transform="matrix(0.46090817,0,0,0.46001719,2166.0344,2722.5596)" />
      </g>
      
      <g id="back" transform="matrix(0.36426857,0,0,0.36426857,-1765.9917,-2150.339)">
        <path :d="shirtConfig.views.back.shadow.path" :fill="shirtConfig.views.back.shadow.fill" :opacity="shirtConfig.views.back.shadow.opacity" />
        
        <g transform="translate(2184.9706,426.09404)">
          <image
            v-if="partState.back['back-design'].designUrl"
            :href="partState.back['back-design'].designUrl"
            :x="shirtConfig.views.back.designParts['back-design'].bbox.x"
            :y="shirtConfig.views.back.designParts['back-design'].bbox.y"
            :width="shirtConfig.views.back.designParts['back-design'].bbox.width"
            :height="shirtConfig.views.back.designParts['back-design'].bbox.height"
            preserveAspectRatio="xMidYMid slice"
            :clip-path="`url(#${shirtConfig.views.back.designParts['back-design'].clipId})`"
          />
          <image
            v-if="partState.back['back-left-sleeve'].designUrl"
            :href="partState.back['back-left-sleeve'].designUrl"
            :x="shirtConfig.views.back.designParts['back-left-sleeve'].bbox.x"
            :y="shirtConfig.views.back.designParts['back-left-sleeve'].bbox.y"
            :width="shirtConfig.views.back.designParts['back-left-sleeve'].bbox.width"
            :height="shirtConfig.views.back.designParts['back-left-sleeve'].bbox.height"
            preserveAspectRatio="xMidYMid slice"
            :clip-path="`url(#${shirtConfig.views.back.designParts['back-left-sleeve'].clipId})`"
            transform="matrix(-0.66286759,-0.74873664,-0.74873664,0.66286759,0,0)"
          />
          <image
            v-if="partState.back['back-right-sleeve'].designUrl"
            :href="partState.back['back-right-sleeve'].designUrl"
            :x="shirtConfig.views.back.designParts['back-right-sleeve'].bbox.x"
            :y="shirtConfig.views.back.designParts['back-right-sleeve'].bbox.y"
            :width="shirtConfig.views.back.designParts['back-right-sleeve'].bbox.width"
            :height="shirtConfig.views.back.designParts['back-right-sleeve'].bbox.height"
            preserveAspectRatio="xMidYMid slice"
            :clip-path="`url(#${shirtConfig.views.back.designParts['back-right-sleeve'].clipId})`"
             transform="rotate(-48.48106)"
          />
          <path :d="shirtConfig.views.back.colorParts['back-collar'].path" :fill="partState.back['back-collar'].fill" />
        </g>
        
        <image 
          :href="shirtConfig.views.back.overlay" 
          :x="shirtConfig.views.back.overlayBbox.x" 
          :y="shirtConfig.views.back.overlayBbox.y" 
          :width="shirtConfig.views.back.overlayBbox.width" 
          :height="shirtConfig.views.back.overlayBbox.height" 
          :style="{mixBlendMode : partState.back['back-design'].designUrl === null ? 'difference' : 'overlay'}"  />
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