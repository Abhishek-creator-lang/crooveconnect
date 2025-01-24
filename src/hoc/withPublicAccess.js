export const withPublicAccess = (Component) => {
  return (props) =>{
      return <Component {...props} />
  }
}
