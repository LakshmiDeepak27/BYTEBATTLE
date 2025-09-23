const Card = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-3xl p-6 shadow-2xl text-white max-w-sm mx-auto my-6 transform transition duration-500 hover:scale-105 hover:rotate-1">
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-white/90">{description}</p>
    </div>
  );
};

export default Card;
