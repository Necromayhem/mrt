<template>
  <div class="error-notification">
    <img src="@/assets/static/error.png" alt="error" width="264" height="198" />
    <div class="error-message">
      <p class="error-title">Сервер не отвечает</p>
      <p class="error-subtitle">Уже работаем над этим</p>
    </div>
  </div>
</template>

<style scoped>
.error-notification {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px;
  text-align: center;
}

.error-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #1c1c1c;
}

.error-subtitle {
  font-size: 16px;
  color: #666;
}
</style>
