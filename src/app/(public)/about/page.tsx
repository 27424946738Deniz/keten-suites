import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container py-10">
      <h1 className="mb-6 text-4xl font-bold">About Keten</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>
              Providing modern, comfortable housing solutions in Istanbul
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Keten offers fully furnished, modern housing solutions for students
              and professionals seeking mid-term rentals in Istanbul. We focus on
              quality, comfort, and convenience.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>What We Offer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Student Housing</h3>
              <p className="text-muted-foreground">
                Affordable, comfortable housing designed specifically for
                university students.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Mid-Term Rentals</h3>
              <p className="text-muted-foreground">
                Flexible lease terms for professionals and digital nomads
                seeking quality accommodation.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

