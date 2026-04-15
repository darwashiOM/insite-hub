const DiffCard = ({ number, title, body, quote }) => (
  <div className="dc">
    <div className="dc-n">{number}</div>
    <div className="dc-t">{title}</div>
    <div className="dc-b">{body}</div>
    {quote && <div className="dc-q">"{quote}"</div>}
  </div>
);
export default DiffCard;
