const { colors } = require("./../instant/colors");
export default function(context) {
  const primary = localStorage.getItem("primary");
  const success = localStorage.getItem("success");
  const error = localStorage.getItem("error");
  const warning = localStorage.getItem("warning");
  const accent = localStorage.getItem("accent");
  const info = localStorage.getItem("info");
  const secondary = localStorage.getItem("secondary");
  const shades = localStorage.getItem("shades");

  //set colors vuetify
  context.$vuetify.theme.themes.light.primary = primary
    ? primary
    : colors.primary;
  context.$vuetify.theme.themes.light.success = success
    ? success
    : colors.success;
  context.$vuetify.theme.themes.light.error = error 
    ? error 
    : colors.error;
  context.$vuetify.theme.themes.light.warning = warning
    ? warning
    : colors.warning;
  context.$vuetify.theme.themes.light.accent = accent 
    ? accent
    : colors.accent;
  context.$vuetify.theme.themes.light.info = info 
    ? info 
    : colors.info;
  context.$vuetify.theme.themes.light.secondary = secondary
    ? secondary
    : colors.secondary;
  context.$vuetify.theme.themes.light.shades = shades
    ? shades
    : colors.shades;

  //console.log(theme);
  context.$axios
    .$get(context.env.config.BASE_URL + "/setting")
    .then(res => {
      context.store.dispatch("checkLogin", res);
    })
    .catch(e => context.error(e));
}
