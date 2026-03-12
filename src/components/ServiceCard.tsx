export interface ServiceData {
  _id: string
  title: string
  description?: string
  icon?: string
  order?: number
}

const iconBgClass = ['service-icon-teal', 'service-icon-warm', 'service-icon-surf', 'service-icon-navy']

export default function ServiceCard({ service, index = 0 }: { service: ServiceData; index?: number }) {
  return (
    <div className="service-preview-card">
      <div className={`service-icon ${iconBgClass[index % 4]}`}>{service.icon || '✦'}</div>
      <h3>{service.title}</h3>
      {service.description && <p>{service.description}</p>}
    </div>
  )
}
