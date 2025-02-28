// src/server.ts
import app from './app';
import config from './config/config';

const PORT: number = parseInt(config.PORT as string, 10);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});