export default function(context) {
  if (context.store.state.auth.loggedIn) {
    return context.app.router.push("/");
  }
}
