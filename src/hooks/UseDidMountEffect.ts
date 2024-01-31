import { useEffect, useRef } from 'react'

const useDidMountEffect = (func: VoidFunction, deps: any[]) => {
	const didMount = useRef<boolean>(false)

	useEffect(() => {
		if (
			didMount.current ||
			deps.some((x) => typeof x === 'boolean' && x === true)
		) {
			func()
		} else {
			didMount.current = true
		}
	}, deps)
}

export default useDidMountEffect
