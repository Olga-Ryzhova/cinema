const HeaderToggle = ({title, isOpen, onToggle}) => {
  return (
    <header 
    className={`conf-step__header ${isOpen ? 'conf-step__header_opened' : 'conf-step__header_closed'}`} 
    onClick={onToggle}
    >
      <h2 className="conf-step__title">{title}</h2>
     </header>
  )
}

export default HeaderToggle;