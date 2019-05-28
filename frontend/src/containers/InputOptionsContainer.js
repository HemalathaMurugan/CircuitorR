import React from 'react'
import Popup from 'semantic-ui-react'

export default class extends React.Component{

    

    render(){ 
        return(
            <div>
                    <div>
                        Choose the inputs  
                    </div>
                    <div>
                        <form >
                        <select name="inputs">
                            <option value="0">0</option>
                            <option value="1">1</option>
                           
                        </select>
                        <br></br>
                        
                        </form>                        
                        
                    </div>
            </div>
        )
    }

}