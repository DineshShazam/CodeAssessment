import React from 'react'
import {Link} from 'react-router-dom'

export default function NotFound() {
    return (
        <div>
            <h1>404</h1>
            <p>Oops! Something is wrong.</p>
            <Link  class="button" to="/Home"><i class="icon-home"></i> Go back to Home page.</Link>
        </div>
    )
}
