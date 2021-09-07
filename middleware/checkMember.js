export default function(context) {
  if (context.store.state.auth.user.ref_id_role.position !== "member") {
    return context.redirect("/");
  }
}
