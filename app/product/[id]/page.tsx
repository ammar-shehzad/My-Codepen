interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const { id } = await params;

  return (
    <>
      <h1>This Is Single Product Page</h1>
      <h2>Your product Id {id}</h2>
    </>
  );
};

export default ProductPage;
