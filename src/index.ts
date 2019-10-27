import app from './app';

export default app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${app.get('port')}`);
});
