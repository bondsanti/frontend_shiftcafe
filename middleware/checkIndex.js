export default function(context) {
  const { position } = context.store.state.auth.user.ref_id_role;
  if (
    position === "admin" ||
    position === "manager" ||
    position === "checker"
  ) {
    return context.app.router.push("/manage");
  } else if (position === "cashier" || position === "staff") {
    return context.app.router.push("/seller");
  } else if (position === "member") {
    return context.app.router.push("/member");
  }
}
