import { browser } from '$app/environment';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

// import { localStorageStore } from '@skeletonlabs/skeleton';

const localStorageStore: Writable<string> = writable("0")

localStorageStore.subscribe((val) => browser && localStorage.setItem("index", val))
export default localStorageStore;
