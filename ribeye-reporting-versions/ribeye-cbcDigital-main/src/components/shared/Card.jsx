function Card({ children }) {
  return (
    <div className="rounded-lg bg-slate-100 backdrop-blur-lg bg-opacity-60 shadow-shadowInset10  p-10 pt-3 hover:bg-opacity-60 hover:bg-blue-100 duration-200 border border-solid border-[rgba(112, 128, 144, 0.10)]">
      {children}
    </div>
  );
}

export default Card;
