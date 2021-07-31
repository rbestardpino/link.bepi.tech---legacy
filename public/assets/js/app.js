document.addEventListener('DOMContentLoaded', function () {
  M.Modal.init(document.querySelectorAll('.modal'))
  M.Sidenav.init(document.querySelectorAll('.sidenav'))

  document
    .getElementById('submit-shorten-form')
    .addEventListener('click', async () => {
      const url = document.getElementById('url').value
      const slug = document.getElementById('slug').value

      if (!url) {
        M.toast({ html: 'URL is required', classes: 'rounded red' })
        return
      }

      const response = await fetch('/url', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          slug: slug || undefined,
        }),
      })
      let error = ''
      if (response.ok) {
        const result = await response.json()
        document.getElementById(
          'shortened'
        ).innerHTML = `Shortened link: <a href="https://link.bepi.tech/${result.slug}">https://link.bepi.tech/${result.slug}</a>`
      } else if (response.status === 429) {
        error = 'You are sending too many requests. Try again in 30 seconds.'
      } else {
        const result = await response.json()
        error = result.message
      }
      if (error) {
        M.toast({ html: error, classes: 'rounded red' })
      }
    })
})
