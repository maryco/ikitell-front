<script lang="ts">
  import { cubicInOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'

  export let pieRadius: number
  export let deadlineLevel = 0
  export let timerExpiresLabel: string
  export let theme: 'normal' | 'warning' = 'normal'

  const gaugeWidth = 22
  const verticalMargiin = 30
  const baseSize = (pieRadius + gaugeWidth) * 2
  const centerX = pieRadius + gaugeWidth
  const centerY = pieRadius + gaugeWidth + verticalMargiin
  const dotRadius = 7
  const applyTheme = theme === 'warning' || deadlineLevel >= 100 ? '--warning' : ''

  const gaugeAngle = tweened(269, {
    duration: 1600,
    easing: cubicInOut,
  })
  $: $gaugeAngle = deadlineLevelToAngle(deadlineLevel)

  let gaugePathDef: string
  $: {
    gaugePathDef = makePathArc($gaugeAngle)
  }

  const makePathArc = (arcAngle: number): string => {
    const radian = (arcAngle * Math.PI) / 180
    const startX = centerX + Math.cos(radian) * pieRadius
    const startY = centerY + Math.sin(radian) * pieRadius

    const endX = centerX
    const endY = centerY - pieRadius

    // NOTE: 円弧の長・短どちらを使用するか
    const applyLargeArc = arcAngle >= 90 && arcAngle <= 270 ? 0 : 1

    // M 始点x 始点y A(A:終点は絶対座標 a:相対座標) x軸半径 y軸半径 0(傾き？) (上記) 1(時計回り) 終点x 終点y
    return `M ${startX} ${startY} A ${pieRadius} ${pieRadius} 0 ${applyLargeArc} 1 ${endX} ${endY}`
  }

  /**
   * Max: 100 = 269 degree
   * Min: 0 = -89 degree
   * @param value 0..100
   */
  const deadlineLevelToAngle = (value: number) => {
    if (value <= 1) {
      return -89
    }
    if (value >= 99) {
      return 269
    }
    return Math.floor(358 * (value / 100)) - 90
  }

  const makeScales = (deadlineLevel: number): { cx: number; cy: number; style: string }[] => {
    const scales: Array<{ cx: number; cy: number; style: string }> = []
    const radius = pieRadius - gaugeWidth - dotRadius / 2

    for (let angle = 360; angle >= 30; angle -= 360 / 12) {
      let radian = (angle * Math.PI) / 180
      scales.push({
        cx: centerX + Math.cos(radian) * radius,
        cy: centerY + Math.sin(radian) * radius,
        style: Math.round((angle / 360) * 100) > deadlineLevel ? 'fill-primary-0' : 'fill-none',
      })
    }
    return scales
  }

  const pathLabelDef = () => {
    const radius = pieRadius + 28
    const radian = (218 * Math.PI) / 180
    const startX = centerX + Math.cos(radian) * radius
    const startY = centerY + Math.sin(radian) * radius
    const endX = centerX
    const endY = centerY - radius
    return `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`
  }
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox={`0 0 ${baseSize} ${baseSize + verticalMargiin * 2}`}
  class={`group ${applyTheme}`}
>
  <filter id="dropShadowFilter">
    <feDropShadow dx="0" dy="0" stdDeviation="2" flood-color="#000000" flood-opacity="0.25" />
  </filter>
  <circle
    class="fill-gray-bright stroke-white group-[.--warning]:stroke-error"
    r={pieRadius}
    cx={centerX}
    cy={centerY}
    stroke-width={`22px`}
    filter="url(#dropShadowFilter)"
    aria-details="base of pie chart"
  ></circle>
  <path
    class="stroke-primary-0 group-[.--warning]:stroke-error"
    d={gaugePathDef}
    fill="none"
    stroke-width={gaugeWidth}
    aria-details={`timer deadline level ${deadlineLevel}`}
  ></path>

  <g class="origin-center -rotate-90 group-[.--warning]:animate-spin" aria-details="scales">
    {#each makeScales(deadlineLevel) as scale}
      <circle
        class={`stroke-white ${scale.style} group-[.--warning]:fill-error group-[.--warning]:stroke-none`}
        r={dotRadius}
        cx={scale.cx}
        cy={scale.cy}
      ></circle>
    {/each}
  </g>

  <path id="label-path" fill="none" d={pathLabelDef()}></path>
  <text class="fill-black *:text-[20px] dark:fill-white"
    ><textPath href="#label-path">{timerExpiresLabel}</textPath></text
  >
</svg>
