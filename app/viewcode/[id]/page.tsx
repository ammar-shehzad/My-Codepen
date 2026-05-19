import MainPage from "../../mainpage/page";

interface ViewCodeProps {
params:Promise<{id:string}>


}

const ViewCode: React.FC<ViewCodeProps> = async({params}) => {

  const {id}=await params

  return (
    
      <MainPage id={id} />
  );
};

export default ViewCode;
