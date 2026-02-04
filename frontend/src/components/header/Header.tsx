// frontend/src/components/header/Header.tsx

import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

type NavItem = { to: string; label: string }

type Props = {
    title?: string
    items: NavItem[]
}

export const Header = ({ title = "CalendarApp", items }: Props) => {
    const [open, setOpen] = useState(false)

    return (
        <header className="app-header">
            <div className="app-header-inner">
                <div className="app-header-left">
                    <div className="app-header-brand">{title}</div>
                </div>

                <button
                    className="app-header-burger"
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Toggle menu"
                    aria-expanded={open}
                >
                    ☰
                </button>

                <nav className={`app-header-nav ${open ? "open" : ""}`}>
                    {items.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `app-header-link ${isActive ? "active" : ""}`
                            }
                            onClick={() => setOpen(false)}
                            end
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    )
}