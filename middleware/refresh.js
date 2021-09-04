export default function(context) {
  context.$axios
    .$get(context.env.config.BASE_URL + "/setting")
    .then(res => {
      context.store.dispatch("checkLogin", res);
    })
    .catch(e => context.error(e));
}
