import type { ComponentType } from "react"

export function withRotate(Component): ComponentType {
    return (props) => {
        return (
            <Component
                {...props}
                animate={{ rotate: 90 }}
                transition={{ duration: 2 }}
            />
        )
    }
}

export function withHover(Component): ComponentType {
    return (props) => {
        return <Component {...props} whileHover={{ scale: 1.05 }} />
    }
}

export function withRandomColor(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()

        return (
            <Component
                {...props}
                animate={{
                    background: store.background,
                }}
                onClick={() => {
                    setStore({ background: randomColor() })
                }}
            />
        )
    }
}