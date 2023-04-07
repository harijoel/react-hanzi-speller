import React from 'react'

export default function HeaderMenu() {
  return (
    <form className='header'>
        <div className='form-group'>
            <label htmlFor="traditional">Traditional</label>
            <input id='traditional' type="checkbox" />
        </div>

        <div className='form-group'>
            <label htmlFor="tones">Include tones</label>
            <input id='tones' type="checkbox" />
        </div>

        <div className='form-group'>
            <label htmlFor="tolerance">Mistake Tolerance</label>
            <input id='tolerance' type="number" min="1" step="1" defaultValue={1} />
        </div> 

    </form>
  )
}
