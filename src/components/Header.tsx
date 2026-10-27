import { useContext } from "react"
import { ThemeContext } from "../context/themeContext"

function Header() {
	// Пример получение данных из контекста, вместо props
	const { theme, setTheme } = useContext(ThemeContext)

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	return (

		<header className={`header-${theme}`}>
			<h2>Task manager</h2>
			<label>
				<input
					type="checkbox" role="switch"
					checked={theme === 'dark'}
					onChange={toggleTheme}
				/>
				Темная тема
			</label>
		</header>
	)
}

export default Header
