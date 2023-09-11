
interface Props { 
	width?: number | `${string}%`
	height?: number | `${string}%`
}
export default ({ width = 80, height = 92 }: Props) => {
	return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 80 92"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M70.6333 0H9.36667C4.16667 0 0 4.25957 0 9.4918V71.004C0 76.2362 4.16667 80.4623 9.36667 80.4958H61.2L58.8 71.9767L64.6333 78.1145L70.1667 83.2461L80 92V9.4918C80 4.25957 75.8333 0.0335399 70.6333 0ZM52.9667 60.07C52.9667 60.07 51.3333 58.0911 49.9667 56.3471C53.2667 55.5756 56.2 53.6303 58.2333 50.8801C56.6 51.9869 54.8333 52.8925 52.9667 53.5968C50.8333 54.5024 48.6 55.1732 46.3 55.5756C42.3667 56.3135 38.3667 56.3135 34.4333 55.5756C32.1667 55.1396 29.9333 54.4688 27.7667 53.5968C26.6333 53.1608 25.5 52.6577 24.4333 52.054L24 51.8192H23.8333C23 51.3496 22.5333 51.0142 22.5333 51.0142C24.5 53.6974 27.3333 55.6427 30.5333 56.4477L27.5 60.2712C22 60.4054 16.7667 57.7893 13.5333 53.2949C13.7 43.9708 15.9667 34.7809 20.2 26.463C23.8667 23.545 28.3667 21.868 33.0333 21.6332L33.5 22.2034C29.1 23.2767 25 25.3562 21.4667 28.2071C21.4667 28.2071 22.4667 27.6704 24.1667 26.8655C27.4667 25.3562 30.9333 24.3835 34.5333 23.981H35.3333C38.4 23.6121 41.5 23.6121 44.5667 23.981C49.4 24.5177 54.0667 26.027 58.3333 28.3748C55 25.658 51.1 23.6456 46.9333 22.5388L47.5667 21.8009C52.2333 22.0357 56.7333 23.7127 60.4333 26.6307C64.6333 34.9486 66.9333 44.1385 67.1 53.4626C63.7667 57.8899 58.4667 60.3719 52.9667 60.07Z"/>
            <path d="M48.4001 48.8006C50.9774 48.8006 53.0667 46.5181 53.0667 43.7025C53.0667 40.8869 50.9774 38.6044 48.4001 38.6044C45.8227 38.6044 43.7334 40.8869 43.7334 43.7025C43.7334 46.5181 45.8227 48.8006 48.4001 48.8006Z"/>
            <path d="M31.7333 38.6044C28.9333 38.3697 26.4666 40.4491 26.2333 43.2665C26 46.0838 28.0666 48.5658 30.8666 48.8006C33.6666 49.0354 36.1333 46.9559 36.3666 44.1385C36.3666 43.9708 36.3666 43.7696 36.3666 43.6019C36.4333 40.9187 34.3333 38.7051 31.7 38.6044H31.7333Z"/>
        </svg>
	)
}
