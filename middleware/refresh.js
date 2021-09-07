export default function(context) {
  const primary = localStorage.getItem("primary");
  const success = localStorage.getItem("success");
  const error = localStorage.getItem("error");
  const warning = localStorage.getItem("warning");
  const accent = localStorage.getItem("accent");
  const info = localStorage.getItem("info");
  const secondary = localStorage.getItem("secondary");
  context.$vuetify.theme.themes.light.primary = primary ? primary : "#1d1d1d";
  context.$vuetify.theme.themes.light.success = success ? success : "#00b894";
  context.$vuetify.theme.themes.light.error = error ? error : "#f14668";
  context.$vuetify.theme.themes.light.warning = warning ? warning : "#ffe08a";
  context.$vuetify.theme.themes.light.accent = accent ? accent : "#485fc7";
  context.$vuetify.theme.themes.light.info = info ? info : "#39b54a";
  context.$vuetify.theme.themes.light.secondary = secondary
    ? secondary
    : "#ededed";
  //console.log(theme);
  context.$axios
    .$get(context.env.config.BASE_URL + "/setting")
    .then(res => {
      context.store.dispatch("checkLogin", res);
    })
    .catch(e => context.error(e));
}
