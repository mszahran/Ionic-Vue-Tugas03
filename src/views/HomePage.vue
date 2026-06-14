<template>
  <ion-page>
    <ion-header translucent="true">
      <ion-toolbar>
        <ion-title>Crypto Tracker</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="loadTickers">Refresh</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Cryptocurrency</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="page-content">
        <div class="status-row">
          <span v-if="loading" class="status-text"><ion-spinner name="crescent" /> Memuat data...</span>
          <span v-else-if="error" class="status-text error">{{ error }}</span>
          <span v-else class="status-text">Menampilkan {{ tickers.length }} cryptocurrency teratas</span>
        </div>

        <ion-list>
          <ion-item v-for="coin in tickers" :key="coin.id">
            <ion-label>
              <h2>{{ coin.rank }}. {{ coin.name }} <span class="symbol">({{ coin.symbol }})</span></h2>
              <p>Harga USD: <strong>{{ formatPrice(coin.price_usd) }}</strong></p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { fetchTickers, type CoinLoreTicker } from '@/services/coinlore';

const tickers = ref<CoinLoreTicker[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

async function loadTickers() {
  loading.value = true;
  error.value = null;

  try {
    tickers.value = await fetchTickers();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data.';
  } finally {
    loading.value = false;
  }
}

function formatPrice(value: string) {
  return Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
}

onMounted(() => {
  loadTickers();
});
</script>

<style scoped>
.page-content {
  padding: 16px;
}

.status-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.status-text {
  color: #444;
  font-size: 14px;
}

.status-text.error {
  color: #c0392b;
}

ion-item {
  margin-bottom: 8px;
  border-radius: 12px;
  --background: #fff7e6;
}

ion-label h2 {
  margin: 0 0 6px;
  font-size: 16px;
}

.symbol {
  color: #666;
  font-size: 14px;
}

ion-label p {
  margin: 0;
  color: #2d3436;
}
</style>
