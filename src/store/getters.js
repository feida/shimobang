const getters = {
  device: state => state.app.device,
  info: state => state.user.info,
  token: state => state.user.token,
  name: state => state.user.name,
  customer_id: state => state.user.customer_id,
  news_categoryData: state => state.user.news_categoryData
}
export default getters
