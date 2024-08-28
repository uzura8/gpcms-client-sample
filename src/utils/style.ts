export function buttonClass(
  type = 'default',
  size = 'base',
  isBorder = false,
  isDisabled = false,
  isReturnString = true
) {
  const classesDef = ['focus:outline-none', 'text-center']
  let classes: string[] = []
  const sizes = ['focus:ring-4', 'font-medium', 'rounded-lg']
  let addSizes: string[] = []

  if (isBorder) {
    switch (type) {
      case 'primary':
        classes = [
          'text-blue-700',
          'hover:text-white',
          'border',
          'border-blue-700',
          'hover:bg-blue-800',
          'focus:ring-blue-300',
          'dark:border-blue-500',
          'dark:text-blue-500',
          'dark:hover:text-white',
          'dark:hover:bg-blue-500',
          'dark:focus:ring-blue-800'
        ]
        break
    }
  } else {
    switch (type) {
      case 'primary':
        classes = [
          'text-white',
          'bg-primary-700',
          'hover:bg-primary-800',
          'focus:ring-primary-300',
          'dark:bg-primary-600',
          'dark:hover:bg-primary-700',
          'dark:focus:ring-primary-800'
        ]
        break

      case 'danger':
        classes = [
          'text-white',
          'bg-danger-700',
          'hover:bg-danger-800',
          'focus:ring-danger-300',
          'dark:bg-danger-600',
          'dark:hover:bg-danger-700',
          'dark:focus:ring-danger-900'
        ]
        break

      case 'ghost':
        classes = ['bg-gray-700', 'bg-opacity-0', 'hover:bg-opacity-5']
        break

      case 'light':
        classes = [
          'text-gray-500',
          'bg-white',
          'border',
          'border-gray-200',
          'hover:bg-gray-100',
          'hover:text-primary-700',
          'focus:ring-gray-200',
          'focus:z-10',
          'dark:bg-gray-800',
          'dark:text-gray-400',
          'dark:border-gray-600',
          'dark:hover:text-white',
          'dark:hover:bg-gray-700',
          'dark:hover:border-gray-600',
          'dark:focus:ring-gray-700'
        ]
        break

      case 'default':
      default:
        classes = [
          'text-gray-900',
          'bg-white',
          'border',
          'border-gray-300',
          'hover:bg-gray-100',
          'focus:ring-gray-200',
          'dark:bg-gray-800',
          'dark:text-white',
          'dark:border-gray-600',
          'dark:hover:bg-gray-700',
          'dark:hover:border-gray-600',
          'dark:focus:ring-gray-700'
        ]
        break
    }
  }
  switch (size) {
    case 'xs':
      addSizes = ['text-xs', 'px-3', 'py-2']
      break
    case 'sm':
      addSizes = ['text-sm', 'px-3', 'py-2']
      break
    case 'lg':
      addSizes = ['text-base', 'px-5', 'py-3']
      break
    case 'xl':
      addSizes = ['text-base', 'px-6', 'py-3.5']
      break
      break
    case 'base':
    case 'md':
    default:
      addSizes = ['text-sm', 'px-5', 'py-2.5']
      break
  }
  classes.push(...classesDef)
  if (isDisabled) {
    classes.push('opacity-50', 'cursor-not-allowed', 'pointer-events-none')
  } else {
    classes.push('cursor-pointer')
  }
  sizes.push(...addSizes)
  classes.push(...sizes)
  return isReturnString ? classes.join(' ') : classes
}

export function badgeClass(
  type = 'default',
  size = 'xs',
  isBorder = false,
  isRound = false,
  isLink = false,
  isReturnString = true
) {
  let classes: string[] = []
  let sizes: string[] = []
  const defaults = ['font-medium', 'me-2', 'px-2.5', 'py-0.5', 'inline-block']

  if (isBorder) defaults.push('border')
  if (isRound) {
    defaults.push('rounded-full')
  } else {
    defaults.push('rounded')
  }

  // class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">Default</span>
  // class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center">Badge link</a>

  switch (type) {
    case 'danger':
      classes = ['bg-danger-100', 'text-danger-800', 'dark:bg-danger-900', 'dark:text-danger-300']
      if (isBorder) classes.push('border-danger-400')
      break

    case 'warning':
      classes = [
        'bg-warning-100',
        'text-warning-800',
        'dark:bg-warning-900',
        'dark:text-warning-300'
      ]
      if (isBorder) classes.push('border-warning-300')
      if (isLink) classes.push('hover:bg-warning-200')
      break

    case 'success':
      classes = ['bg-green-100', 'text-green-800', 'dark:bg-green-900', 'dark:text-green-300']
      if (isBorder) classes.push('border-green-400')
      if (isLink) classes.push('hover:bg-green-200')
      break

    case 'primary':
      classes = [
        'bg-primary-100',
        'text-primary-800',
        'dark:bg-primary-900',
        'dark:text-primary-300'
      ]
      if (isBorder) classes.push('border-primary-400')
      if (isLink) classes.push('hover:bg-primary-200')
      break

    case 'default':
    default:
      classes = ['bg-gray-100', 'text-gray-800', 'dark:bg-gray-700', 'dark:text-gray-300']
      if (isBorder) classes.push('border-gray-500')
      if (isLink) classes.push('hover:bg-gray-200')
      break
  }

  switch (size) {
    case 'sm':
      sizes = ['text-sm']
      break
    default:
    case 'xs':
      sizes = ['text-xs']
      break
  }
  classes.push(...defaults)
  classes.push(...sizes)
  return isReturnString ? classes.join(' ') : classes
}
