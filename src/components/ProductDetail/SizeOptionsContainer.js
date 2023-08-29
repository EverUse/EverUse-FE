const SizeOptionsContainer = ({isSingleSize}) => {
  return (
    <div className="size-options-container">
      {!isSingleSize && <div className="multiple-choice-container">
        <>
          <input type="radio" name="size-options" id="S" value="small" className="multiple-choice-option"/>
          <label htmlFor='S'>S</label>
        </>
        <>
          <input type="radio" name="size-options" id="M" value="medium" className="multiple-choice-option"/>
          <label htmlFor='M'>M</label>
        </>
        <>
          <input type="radio" name="size-options" id="L" value="large" className="multiple-choice-option"/>
          <label htmlFor='L'>L</label>
        </>
      </div>}
      {isSingleSize && <div className="single-choice-container">
        <input type="radio" name="size-options" id="onesize" value="onesize" className="single-choice-option"/>
        <label htmlFor='onesize'>S</label>
      </div>}
    </div>
  )
}

export default SizeOptionsContainer;