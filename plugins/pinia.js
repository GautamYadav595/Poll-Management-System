import { createPinia } from 'pinia';

export default defineNuxtPlugin(nuxtApp => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia); // Ensure Pinia is registered with Vue
});
