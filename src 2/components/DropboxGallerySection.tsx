import DropboxGallery from '@/components/DropboxGallery';

interface DropboxGallerySectionProps {
  folder: string;
  title: string;
  description?: string;
  unavailableMessage?: string;
  emptyMessage?: string;
}

const DropboxGallerySection = ({
  folder,
  title,
  description,
  unavailableMessage,
  emptyMessage,
}: DropboxGallerySectionProps) => {
  if (!folder.trim()) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold mb-3">{title}</h3>
        {description ? (
          <p className="text-muted-foreground max-w-3xl mx-auto">{description}</p>
        ) : null}
      </div>

      <DropboxGallery
        folder={folder}
        unavailableMessage={unavailableMessage}
        emptyMessage={emptyMessage}
      />
    </section>
  );
};

export default DropboxGallerySection;