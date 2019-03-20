const getters = {
  device: state => state.app.device,
  info: state => state.user.info,
  token: state => state.user.token,
  name: state => state.user.name
}
export default getters
