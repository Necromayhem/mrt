<template>
  <div class="favorites-notification">
    <img src="/src/assets/static/empty.png" alt="empty" width="264" height="198" />
    <div class="favorites-message">
      <p class="favorites-title">Список избранного пуст</p>
      <p class="favorites-subtitle">Добавляйте изображения, нажимая на звездочки</p>
    </div>
  </div>
</template>

<style scoped>
.favorites-notification {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px;
  text-align: center;
}

.favorites-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #1c1c1c;
}

.favorites-subtitle {
  font-size: 16px;
  color: #666;
}
</style>
