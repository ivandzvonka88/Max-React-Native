const adjustMaxs = (maxs, convert, toPounds) => {
    var multi = 1
    if (convert) { multi = toPounds ? 2.20462 : 0.453592 }
    for (var m in maxs) { maxs[m].max = Math.round(maxs[m].max * multi) }
    return maxs
}

export { adjustMaxs }