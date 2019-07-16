export default async function(delay) {
    const o = new Promise((r) => {
        setTimeout(r, delay)
    })
    await o()
}
