export default function (context) {
  if (context.store.state.auth.loggedIn) {
    if (context.store.state.auth.user.ref_id_role.position !== 'cashier') {
      return context.redirect('/member')
    }
    return context.redirect('/seller')
  }
}
