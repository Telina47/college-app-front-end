// src/composables/useSnackbar.ts
import { ref } from 'vue';

const snackbarMessage = ref('');
const snackbarType = ref<'success' | 'error'>('success');
const snackbarVisible = ref(false);

let timeout: number;
// src/utils/snackbarManager.ts
let showSnackbar: ((msg: string, type?: 'success' | 'error') => void) | null = null;

export function registerSnackbar(fn: typeof showSnackbar) {
    showSnackbar = fn;
}

export function triggerSnackbar(message: string, type: 'success' | 'error' = 'success') {
    if (showSnackbar) {
        showSnackbar(message, type);
    } else {
        console.warn('Snackbar not registered');
    }
}

export function useSnackbar() {
    const showSnackbar = (message: string, type: 'success' | 'error' = 'success') => {
        snackbarMessage.value = message;
        snackbarType.value = type;
        snackbarVisible.value = true;

        clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            snackbarVisible.value = false;
        }, 3000);
    };

    return {
        snackbarMessage,
        snackbarType,
        snackbarVisible,
        showSnackbar
    };
}
