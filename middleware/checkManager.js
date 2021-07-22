export default function(context) {
  if (context.store.state.auth.user.ref_id_role.position === "manager") {
    return context.redirect("/manage");
  }
}
