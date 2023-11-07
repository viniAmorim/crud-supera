import { useEffect, useRef } from 'react';

export function useDebounce(func: any, delay = 1000) {
	const timer = useRef<any>();

	useEffect(() => {
		return () => {
			if (!timer.current) return;
			clearTimeout(timer.current);
		};
	}, []);

	const debouncedFunction = ((...args: any[]) => {
		const newTimer = setTimeout(() => {
			func(...args);
		}, delay);
		clearTimeout(timer.current);
		timer.current = newTimer;
	}) as any;

	return debouncedFunction;
}