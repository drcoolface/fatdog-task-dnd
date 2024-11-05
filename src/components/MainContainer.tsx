const MainContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className=" bg-blue-100  container mx-auto flex  justify-center w-full min-h-screen">
      {children}
    </div>
  );
};

export default MainContainer;
