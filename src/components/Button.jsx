function Button({ href, children, className = '', ...props }) {
    return (
        <a
            href={href}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full button text-center cursor-pointer ${className}`}
            style={{ transition: 'transform 0.2s ease-in-out' }}
            {...props}
        >
            {children}
        </a>
    );
}

export default Button;
